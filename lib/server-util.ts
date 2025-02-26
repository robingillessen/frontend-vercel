'use server'

import mockData from '../temp.json'

// This is a server action that returns mock data from temp.json
export async function getMockResponse() {
    // delay the response
    await new Promise(resolve => setTimeout(resolve, 1000));
  try {
    return mockData;
  } catch (error) {
    console.error('Error getting mock response:', error);
    throw new Error('Failed to get mock response');
  }
}