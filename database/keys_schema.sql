-- Physical Keys Management Database Schema
-- For Housing Capital NZ Project

-- Main keys table
CREATE TABLE physical_keys (
    key_id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    key_number INT NOT NULL,
    key_type ENUM('front_door', 'back_door', 'garage', 'mailbox', 'gate', 'other') DEFAULT 'front_door',
    serial_number VARCHAR(100) UNIQUE,
    manufacturer VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('available', 'assigned', 'lost', 'damaged', 'replaced') DEFAULT 'available',
    storage_location VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (property_id) REFERENCES properties(property_id)
);

-- Key assignments and handovers
CREATE TABLE key_assignments (
    assignment_id VARCHAR(50) PRIMARY KEY,
    key_id VARCHAR(50) NOT NULL,
    property_id VARCHAR(50) NOT NULL,
    assigned_to_name VARCHAR(100) NOT NULL,
    assigned_to_email VARCHAR(100),
    assigned_to_phone VARCHAR(20),
    assignment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    status ENUM('active', 'returned', 'lost', 'archived') DEFAULT 'active',
    signed_by VARCHAR(100),
    signature_date TIMESTAMP,
    return_signature VARCHAR(100),
    return_signature_date TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (key_id) REFERENCES physical_keys(key_id),
    FOREIGN KEY (property_id) REFERENCES properties(property_id)
);

-- Audit trail for all key movements
CREATE TABLE key_audit_log (
    log_id VARCHAR(50) PRIMARY KEY,
    key_id VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    action_details VARCHAR(500),
    performed_by VARCHAR(100) NOT NULL,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    device_info VARCHAR(200),
    FOREIGN KEY (key_id) REFERENCES physical_keys(key_id),
    INDEX idx_key_date (key_id, action_date),
    INDEX idx_action_date (action_date)
);

-- Key maintenance records
CREATE TABLE key_maintenance (
    maintenance_id VARCHAR(50) PRIMARY KEY,
    key_id VARCHAR(50) NOT NULL,
    maintenance_type ENUM('cleaning', 'repair', 'duplication', 'replacement') NOT NULL,
    description TEXT,
    performed_by VARCHAR(100),
    maintenance_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cost DECIMAL(10, 2),
    notes TEXT,
    FOREIGN KEY (key_id) REFERENCES physical_keys(key_id)
);

-- Lost or damaged keys tracking
CREATE TABLE lost_damaged_keys (
    incident_id VARCHAR(50) PRIMARY KEY,
    key_id VARCHAR(50) NOT NULL,
    property_id VARCHAR(50) NOT NULL,
    incident_type ENUM('lost', 'damaged', 'stolen') NOT NULL,
    reported_by VARCHAR(100),
    reported_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    incident_date TIMESTAMP,
    incident_location VARCHAR(255),
    description TEXT,
    replacement_ordered BOOLEAN DEFAULT FALSE,
    replacement_date TIMESTAMP,
    cost DECIMAL(10, 2),
    status ENUM('open', 'resolved', 'closed') DEFAULT 'open',
    FOREIGN KEY (key_id) REFERENCES physical_keys(key_id),
    FOREIGN KEY (property_id) REFERENCES properties(property_id)
);

-- Create indexes for performance
CREATE INDEX idx_keys_property ON physical_keys(property_id);
CREATE INDEX idx_keys_status ON physical_keys(status);
CREATE INDEX idx_assignments_property ON key_assignments(property_id);
CREATE INDEX idx_assignments_status ON key_assignments(status);
CREATE INDEX idx_assignments_date ON key_assignments(assignment_date);

-- Triggers for audit trail
DELIMITER $$
CREATE TRIGGER key_status_change
AFTER UPDATE ON physical_keys
FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO key_audit_log (log_id, key_id, action, action_details, performed_by, action_date)
        VALUES (UUID(), NEW.key_id, 'STATUS_CHANGE', CONCAT('Changed from ', OLD.status, ' to ', NEW.status), USER(), NOW());
    END IF;
END$$
DELIMITER ;
