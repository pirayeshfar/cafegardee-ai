/*
 * DEPRECATED: This serverless function is no longer in use.
 * The application has been updated to call the Google Gemini API directly from the client-side
 * in `src/services/geminiService.ts`.
 *
 * This file and the entire `/api` directory can be safely deleted from the project.
 * Leaving it here may cause confusion or conflicts with some deployment platforms.
 */

// This function returns a "410 Gone" status to indicate the endpoint is permanently removed.
export default async function handler(request: Request) {
    const message = "This API route is deprecated and no longer used. The app now calls the Gemini API directly from the client. Please see src/services/geminiService.ts for the current implementation.";
    
    return new Response(JSON.stringify({ 
        error: message,
        deprecation_notice: "This entire /api directory can be safely deleted."
    }), { 
        status: 410, // HTTP 410 Gone
        headers: { 'Content-Type': 'application/json' }
    });
}
