import { Blog, CreateBlogInput } from "@/types/blog";

const API_BASE_URL = "http://localhost:3001";

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export async function fetchBlogById(id: number): Promise<Blog> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch blog: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    throw error;
  }
}

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        date: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error(`Failed to create blog: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

export async function deleteBlog(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Failed to delete blog: ${response.statusText}`);
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error);
    throw error;
  }
}
