# API Integration Documentation

## Tuya API Integration

### Authentication
```typescript
interface TuyaAuthConfig {
  clientId: string;
  clientSecret: string;
  region: 'us' | 'eu' | 'cn' | 'in';
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}
```

### Device Management Endpoints

#### 1. Device Information
```typescript
// GET /v1.0/devices/{device_id}
interface DeviceInfoResponse {
  result: {
    id: string;
    name: string;
    uid: string;
    local_key: string;
    category: string;
    product_id: string;
    product_name: string;
    sub_devices?: DeviceInfo[];
    status: DeviceStatus[];
  };
  success: boolean;
  t: number;
}
```

#### 2. Device Status
```typescript
// GET /v1.0/devices/{device_id}/status
interface DeviceStatusResponse {
  result: {
    code: string;
    value: any;
    timestamp: number;
  }[];
  success: boolean;
  t: number;
}
```

#### 3. Device Logs
```typescript
// GET /v1.0/devices/{device_id}/logs
interface DeviceLogsRequest {
  device_id: string;
  start_time: number;
  end_time: number;
  type?: 'ERROR' | 'WARNING' | 'INFO';
  last_row_key?: string;
  limit?: number;
}

interface DeviceLogsResponse {
  result: {
    logs: {
      code: string;
      message: string;
      timestamp: number;
      type: string;
    }[];
    has_more: boolean;
    last_row_key: string;
  };
  success: boolean;
  t: number;
}
```

### Error Handling

#### 1. Error Codes
```typescript
enum TuyaErrorCode {
  SUCCESS = 'SUCCESS',
  PARAM_ERROR = 'PARAM_ERROR',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  DEVICE_NOT_FOUND = 'DEVICE_NOT_FOUND',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  RATE_LIMIT = 'RATE_LIMIT',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

interface TuyaError {
  code: TuyaErrorCode;
  message: string;
  requestId?: string;
  t?: number;
}
```

#### 2. Rate Limiting
- Default: 50 requests per minute
- Burst: Up to 100 requests in short intervals
- Recovery: Linear backoff with exponential retry

### API Client Implementation

```typescript
class TuyaAPIClient {
  private config: TuyaAuthConfig;
  private httpClient: AxiosInstance;

  constructor(config: TuyaAuthConfig) {
    this.config = config;
    this.httpClient = axios.create({
      baseURL: this.getBaseUrl(),
      timeout: 10000,
    });
    this.setupInterceptors();
  }

  private getBaseUrl(): string {
    const regionMap = {
      us: 'https://openapi.tuyaus.com',
      eu: 'https://openapi.tuyaeu.com',
      cn: 'https://openapi.tuyacn.com',
      in: 'https://openapi.tuyain.com',
    };
    return regionMap[this.config.region];
  }

  private async refreshToken(): Promise<void> {
    // Token refresh implementation
  }

  private setupInterceptors(): void {
    this.httpClient.interceptors.request.use(
      this.addAuthHeaders.bind(this)
    );
    
    this.httpClient.interceptors.response.use(
      response => response,
      this.handleError.bind(this)
    );
  }

  private async addAuthHeaders(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    // Add authentication headers
    return config;
  }

  private async handleError(error: AxiosError): Promise<never> {
    // Error handling implementation
    throw error;
  }

  // API Methods
  async getDeviceInfo(deviceId: string): Promise<DeviceInfoResponse> {
    return this.httpClient.get(`/v1.0/devices/${deviceId}`);
  }

  async getDeviceStatus(deviceId: string): Promise<DeviceStatusResponse> {
    return this.httpClient.get(`/v1.0/devices/${deviceId}/status`);
  }

  async getDeviceLogs(params: DeviceLogsRequest): Promise<DeviceLogsResponse> {
    return this.httpClient.get(`/v1.0/devices/${params.device_id}/logs`, { params });
  }
}
```

## AutoAgent Integration

### 1. Knowledge Base API

```typescript
interface KnowledgeBaseConfig {
  endpoint: string;
  apiKey: string;
  embeddingModel: string;
  maxTokens: number;
}

class KnowledgeBaseClient {
  constructor(config: KnowledgeBaseConfig) {
    // Implementation
  }

  async query(params: KnowledgeQuery): Promise<KnowledgeResult> {
    // Implementation
  }

  async index(document: Document): Promise<void> {
    // Implementation
  }
}
```

### 2. Vector Store API

```typescript
interface VectorStoreConfig {
  endpoint: string;
  dimension: number;
  metric: 'cosine' | 'euclidean' | 'dot';
}

class VectorStoreClient {
  constructor(config: VectorStoreConfig) {
    // Implementation
  }

  async upsert(vectors: Vector[]): Promise<void> {
    // Implementation
  }

  async search(query: Vector, k: number): Promise<SearchResult[]> {
    // Implementation
  }
}
```

### 3. LLM Integration

```typescript
interface LLMConfig {
  model: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
}

class LLMClient {
  constructor(config: LLMConfig) {
    // Implementation
  }

  async generate(prompt: string): Promise<string> {
    // Implementation
  }

  async embed(text: string): Promise<number[]> {
    // Implementation
  }
}
```

## Email Integration

### 1. Email Client Configuration

```typescript
interface EmailConfig {
  service: 'smtp' | 'ses' | 'sendgrid';
  credentials: {
    apiKey?: string;
    username?: string;
    password?: string;
  };
  defaults: {
    from: string;
    replyTo: string;
  };
}
```

### 2. Email Templates

```typescript
interface EmailTemplate {
  name: string;
  subject: string;
  body: string;
  variables: string[];
}

interface EmailData {
  to: string;
  template: string;
  variables: Record<string, string>;
  attachments?: EmailAttachment[];
}
```

### 3. Implementation

```typescript
class EmailClient {
  constructor(config: EmailConfig) {
    // Implementation
  }

  async send(data: EmailData): Promise<void> {
    // Implementation
  }

  async getTemplate(name: string): Promise<EmailTemplate> {
    // Implementation
  }
}
```

## Integration Testing

### 1. Test Configuration

```typescript
interface TestConfig {
  environment: 'development' | 'staging' | 'production';
  mockResponses: boolean;
  recordFixtures: boolean;
}
```

### 2. Test Cases

```typescript
interface TestCase {
  name: string;
  input: any;
  expectedOutput: any;
  mockData?: any;
}
```

### 3. Implementation

```typescript
class IntegrationTester {
  constructor(config: TestConfig) {
    // Implementation
  }

  async runTests(tests: TestCase[]): Promise<TestResult[]> {
    // Implementation
  }

  async recordFixture(name: string, data: any): Promise<void> {
    // Implementation
  }
}
```

## Monitoring and Logging

### 1. Metrics Collection

```typescript
interface MetricsConfig {
  endpoint: string;
  interval: number;
  tags: Record<string, string>;
}

class MetricsCollector {
  constructor(config: MetricsConfig) {
    // Implementation
  }

  record(metric: string, value: number): void {
    // Implementation
  }
}
```

### 2. Log Aggregation

```typescript
interface LogConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  destination: 'file' | 'stdout' | 'service';
  format: 'json' | 'text';
}

class Logger {
  constructor(config: LogConfig) {
    // Implementation
  }

  log(level: string, message: string, context?: any): void {
    // Implementation
  }
}
```

## Security

### 1. Authentication

```typescript
interface AuthConfig {
  type: 'jwt' | 'oauth2' | 'apikey';
  credentials: Record<string, string>;
  scopes?: string[];
}
```

### 2. Encryption

```typescript
interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  iv?: Buffer;
}

class Encryptor {
  constructor(config: EncryptionConfig) {
    // Implementation
  }

  encrypt(data: string): string {
    // Implementation
  }

  decrypt(data: string): string {
    // Implementation
  }
}
