# Data Structures and Logging Documentation

## API Data Structures

### 1. User Input Schema
```typescript
interface UserInput {
  email: string;
  deviceId: string;
  issueCategory: string;
  description: string;
  attachments?: {
    type: 'image' | 'log' | 'video';
    url: string;
  }[];
  timestamp: string;
}
```

### 2. Device Details Schema (Tuya API)
```typescript
interface DeviceDetails {
  deviceId: string;
  productId: string;
  deviceName: string;
  deviceType: string;
  deviceStatus: {
    online: boolean;
    lastOnline: string;
    firmware: string;
    signal: number;
  };
  capabilities: {
    functions: string[];
    properties: Record<string, any>;
  };
  location: {
    ip?: string;
    timezone: string;
    region: string;
  };
}
```

### 3. Device Logs Schema
```typescript
interface DeviceLog {
  deviceId: string;
  timestamp: string;
  type: 'ERROR' | 'WARNING' | 'INFO' | 'DEBUG';
  code: string;
  message: string;
  context: {
    function?: string;
    state?: Record<string, any>;
    networkInfo?: {
      signal: number;
      latency: number;
      protocol: string;
    };
  };
}

interface DeviceLogQuery {
  deviceId: string;
  startTime: string;
  endTime: string;
  types?: ('ERROR' | 'WARNING' | 'INFO' | 'DEBUG')[];
  limit?: number;
}
```

### 4. Analysis Results Schema
```typescript
interface LogAnalysis {
  deviceId: string;
  timeRange: {
    start: string;
    end: string;
  };
  patterns: {
    type: string;
    frequency: number;
    significance: number;
    relatedLogs: string[];
  }[];
  anomalies: {
    type: string;
    confidence: number;
    description: string;
    timestamp: string;
  }[];
  metrics: {
    errorRate: number;
    avgResponseTime: number;
    stabilityScore: number;
  };
}
```

### 5. Knowledge Base Query Schema
```typescript
interface KnowledgeQuery {
  deviceType: string;
  issueCategory: string;
  symptoms: string[];
  context: {
    logs?: DeviceLog[];
    analysis?: LogAnalysis;
  };
  filters?: {
    productVersion?: string;
    region?: string;
    language?: string;
  };
}

interface KnowledgeResult {
  articles: {
    id: string;
    title: string;
    content: string;
    relevance: number;
    source: string;
  }[];
  solutions: {
    id: string;
    steps: string[];
    successRate: number;
    complexity: 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
}
```

### 6. Response Generation Schema
```typescript
interface GeneratedResponse {
  type: 'SOLUTION' | 'TROUBLESHOOTING' | 'ESCALATION';
  content: {
    summary: string;
    details: string;
    steps?: string[];
    recommendations?: string[];
  };
  sources: {
    type: string;
    reference: string;
    confidence: number;
  }[];
  metadata: {
    generationTime: string;
    modelVersion: string;
    confidenceScore: number;
  };
}
```

## Logging System

### 1. System Logging Levels
- ERROR: Critical issues requiring immediate attention
- WARNING: Potential issues or anomalies
- INFO: Normal operational events
- DEBUG: Detailed debugging information

### 2. Log Categories
- API_CALLS: Tuya API interactions
- USER_ACTIONS: User input and interactions
- DEVICE_EVENTS: Device status changes and events
- AGENT_OPERATIONS: AutoAgent processing steps
- SYSTEM_EVENTS: Internal system events

### 3. Log Storage Format
```typescript
interface SystemLog {
  id: string;
  timestamp: string;
  level: 'ERROR' | 'WARNING' | 'INFO' | 'DEBUG';
  category: 'API_CALLS' | 'USER_ACTIONS' | 'DEVICE_EVENTS' | 'AGENT_OPERATIONS' | 'SYSTEM_EVENTS';
  message: string;
  context: {
    operation: string;
    component: string;
    user?: string;
    deviceId?: string;
    duration?: number;
    error?: {
      code: string;
      stack?: string;
    };
  };
  metadata: Record<string, any>;
}
```

### 4. Metrics Collection
```typescript
interface PerformanceMetrics {
  component: string;
  operation: string;
  timestamp: string;
  duration: number;
  success: boolean;
  resourceUsage?: {
    cpu: number;
    memory: number;
    network: number;
  };
  customMetrics?: Record<string, number>;
}
```

## Data Retention and Privacy

### 1. Retention Policies
- Device Logs: 30 days rolling window
- System Logs: 90 days rolling window
- Performance Metrics: 180 days rolling window
- User Interactions: 1 year
- Anonymized Analytics: 2 years

### 2. Data Masking Rules
- PII (Personally Identifiable Information)
- Network Information
- Location Data
- Device Credentials

### 3. Access Control Levels
- Admin: Full access to all logs and metrics
- Support: Access to customer-related logs and device data
- Analyst: Access to anonymized data for analysis
- Customer: Access to own device logs and interactions

## Integration Points

### 1. Tuya API Integration
- Authentication and Authorization
- Rate Limiting and Quotas
- Error Handling and Retries
- Data Transformation

### 2. Vector Database Integration
- Document Indexing
- Query Processing
- Embedding Updates
- Cache Management

### 3. Analytics Integration
- Real-time Metrics
- Batch Processing
- Report Generation
- Alert Triggers

## Monitoring and Alerting

### 1. System Health Metrics
- API Response Times
- Error Rates
- Resource Utilization
- Queue Lengths

### 2. Alert Thresholds
- Critical: Immediate action required
- Warning: Investigation needed
- Info: Monitoring purposes

### 3. Alert Channels
- Email Notifications
- SMS Alerts
- Dashboard Indicators
- Incident Management System

## Backup and Recovery

### 1. Backup Schedule
- System Logs: Daily
- Device Logs: Real-time
- Analytics Data: Weekly
- Configuration: On change

### 2. Recovery Procedures
- Point-in-time Recovery
- System State Restoration
- Data Consistency Checks
- Failover Procedures
