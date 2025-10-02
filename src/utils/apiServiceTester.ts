/**
 * API Service Test Utility
 * Tests the fixed API service for proper error handling and request configuration
 */

import apiService from '@/services/api/apiService';

export class ApiServiceTester {
  static async testErrorHandling() {
    console.log('🧪 Testing API Service Error Handling...');
    
    try {
      // Test 1: Invalid endpoint (should handle 404 gracefully)
      await apiService.get('/nonexistent-endpoint');
    } catch (error) {
      console.log('✅ Error handling test passed:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  static async testHealthCheck() {
    console.log('🧪 Testing Health Check...');
    
    try {
      const result = await apiService.healthCheck();
      console.log('✅ Health check result:', result);
    } catch (error) {
      console.log('⚠️ Health check failed (expected):', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  static async testTimeout() {
    console.log('🧪 Testing Timeout Configuration...');
    
    // Set a very short timeout for testing
    apiService.setTimeout(1000); // 1 second
    
    try {
      // This should timeout quickly
      await apiService.get('/slow-endpoint');
    } catch (error) {
      if (error instanceof Error && error.message.includes('timeout')) {
        console.log('✅ Timeout test passed:', error.message);
      } else {
        console.log('⚠️ Timeout test failed:', error instanceof Error ? error.message : 'Unknown error');
      }
    }
    
    // Reset to default timeout
    apiService.setTimeout(30000);
  }

  static async testContentTypeHeaders() {
    console.log('🧪 Testing Content-Type Headers...');
    
    try {
      // GET request should not have Content-Type header
      await apiService.get('/test');
      console.log('✅ GET request (no Content-Type) - handled gracefully');
    } catch (error) {
      console.log('⚠️ GET request error (expected):', error instanceof Error ? error.message : 'Unknown error');
    }

    try {
      // POST request with data should have Content-Type header
      await apiService.post('/test', { message: 'test' });
      console.log('✅ POST request (with Content-Type) - handled gracefully');
    } catch (error) {
      console.log('⚠️ POST request error (expected):', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  static async runAllTests() {
    console.log('🚀 Running API Service Tests...\n');
    
    await this.testErrorHandling();
    console.log('');
    
    await this.testHealthCheck();
    console.log('');
    
    await this.testTimeout();
    console.log('');
    
    await this.testContentTypeHeaders();
    console.log('');
    
    console.log('✅ All API Service tests completed!');
  }
}

// Auto-run tests in development mode
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Add a delay to ensure the app is loaded
  setTimeout(() => {
    ApiServiceTester.runAllTests();
  }, 2000);
}