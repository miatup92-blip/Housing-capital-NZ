// Physical Keys Management API Service
// For Housing Capital NZ Project

class KeysManagementService {
  
  /**
   * Create a new key record
   */
  async createKey(keyData) {
    const {
      property_id,
      key_number,
      key_type,
      serial_number,
      manufacturer,
      storage_location,
      notes
    } = keyData;

    const key_id = this.generateKeyId();
    
    return await db.query(
      `INSERT INTO physical_keys 
       (key_id, property_id, key_number, key_type, serial_number, manufacturer, storage_location, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'available')`,
      [key_id, property_id, key_number, key_type, serial_number, manufacturer, storage_location, notes]
    );
  }

  /**
   * Assign key to a person
   */
  async assignKey(keyId, assignmentData) {
    const {
      property_id,
      assigned_to_name,
      assigned_to_email,
      assigned_to_phone,
      signed_by
    } = assignmentData;

    const assignment_id = this.generateAssignmentId();

    await db.query(
      `INSERT INTO key_assignments 
       (assignment_id, key_id, property_id, assigned_to_name, assigned_to_email, assigned_to_phone, signed_by, signature_date, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'active')`,
      [assignment_id, keyId, property_id, assigned_to_name, assigned_to_email, assigned_to_phone, signed_by]
    );

    // Update key status
    await db.query('UPDATE physical_keys SET status = ? WHERE key_id = ?', ['assigned', keyId]);

    // Log action
    await this.logKeyAction(keyId, 'KEY_ASSIGNED', `Assigned to ${assigned_to_name}`, signed_by);

    return { assignment_id, keyId };
  }

  /**
   * Record key return
   */
  async returnKey(assignmentId, returnData) {
    const { return_signature, return_notes } = returnData;

    await db.query(
      `UPDATE key_assignments 
       SET status = 'returned', return_date = NOW(), return_signature = ?, return_signature_date = NOW(), notes = ?
       WHERE assignment_id = ?`,
      [return_signature, return_notes, assignmentId]
    );

    // Get key_id from assignment
    const assignment = await db.query(
      'SELECT key_id FROM key_assignments WHERE assignment_id = ?',
      [assignmentId]
    );

    const keyId = assignment[0].key_id;

    // Update key status
    await db.query('UPDATE physical_keys SET status = ? WHERE key_id = ?', ['available', keyId]);

    // Log action
    await this.logKeyAction(keyId, 'KEY_RETURNED', `Key returned by ${return_signature}`, return_signature);

    return { success: true, assignment_id: assignmentId };
  }

  /**
   * Report lost or damaged key
   */
  async reportLostDamagedKey(keyId, incidentData) {
    const {
      incident_type,
      reported_by,
      incident_date,
      incident_location,
      description
    } = incidentData;

    const incident_id = this.generateIncidentId();

    // Get property_id from key
    const key = await db.query(
      'SELECT property_id FROM physical_keys WHERE key_id = ?',
      [keyId]
    );

    const property_id = key[0].property_id;

    // Create incident record
    await db.query(
      `INSERT INTO lost_damaged_keys 
       (incident_id, key_id, property_id, incident_type, reported_by, incident_date, incident_location, description, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'open')`,
      [incident_id, keyId, property_id, incident_type, reported_by, incident_date, incident_location, description]
    );

    // Update key status
    await db.query(
      'UPDATE physical_keys SET status = ? WHERE key_id = ?',
      [incident_type === 'lost' ? 'lost' : 'damaged', keyId]
    );

    // Log action
    await this.logKeyAction(keyId, 'INCIDENT_REPORTED', `${incident_type} - ${description}`, reported_by);

    return { incident_id, keyId };
  }

  /**
   * Get all keys for a property
   */
  async getKeysByProperty(propertyId) {
    return await db.query(
      'SELECT * FROM physical_keys WHERE property_id = ? ORDER BY key_number',
      [propertyId]
    );
  }

  /**
   * Get key audit trail
   */
  async getKeyAuditTrail(keyId) {
    return await db.query(
      'SELECT * FROM key_audit_log WHERE key_id = ? ORDER BY action_date DESC',
      [keyId]
    );
  }

  /**
   * Get key assignment history
   */
  async getKeyAssignmentHistory(keyId) {
    return await db.query(
      'SELECT * FROM key_assignments WHERE key_id = ? ORDER BY assignment_date DESC',
      [keyId]
    );
  }

  /**
   * Log key action
   */
  async logKeyAction(keyId, action, actionDetails, performedBy) {
    const log_id = this.generateLogId();
    
    return await db.query(
      `INSERT INTO key_audit_log 
       (log_id, key_id, action, action_details, performed_by, action_date)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [log_id, keyId, action, actionDetails, performedBy]
    );
  }

  // Helper methods
  generateKeyId() {
    return 'KEY_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  generateAssignmentId() {
    return 'ASSIGN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  generateIncidentId() {
    return 'INC_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  generateLogId() {
    return 'LOG_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

module.exports = KeysManagementService;
