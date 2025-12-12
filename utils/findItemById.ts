/**
 * Utility functions for finding items and generating routes
 */

/**
 * Get the route for a specific item by ID
 * @param id - The item ID
 * @returns The route path for the item
 */
export function getItemRoute(id: string): string {
  // Check if it's a founding document
  const foundingDocs = [
    'declaration',
    'articles',
    'constitution',
    'bill-of-rights',
    'federalist-papers',
  ];
  
  if (foundingDocs.includes(id)) {
    return `/document/${id}`;
  }
  
  // Default to detail route
  return `/detail/${id}`;
}

/**
 * Find an item by ID across all content sections
 * @param id - The item ID to find
 * @returns The item object if found, null otherwise
 */
export function findItemById(id: string): any | null {
  // This is a placeholder - in a real app, you would search through your content data
  // For now, we just return null as the actual implementation depends on your data structure
  return null;
}