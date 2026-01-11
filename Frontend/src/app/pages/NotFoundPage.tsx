import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { FileQuestion, Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900 dark:to-blue-900 flex items-center justify-center">
            <FileQuestion className="h-16 w-16 text-emerald-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl text-emerald-600">404</h1>
          <h2>Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

