import React, { useState } from 'react';
import { Package, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onResetSent: () => void;
}

export function ForgotPasswordPage({ onBackToLogin, onResetSent }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false);
      onResetSent();
    }, 1500);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Logo and Title */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900">InventoryPro</h1>
        <p className="text-gray-600">Reset your password</p>
      </div>

      {/* Reset Form */}
      <Card>
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Mail className="w-4 h-4 mr-2 animate-pulse" />
                  Sending reset link...
                </>
              ) : (
                'Send reset link'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Back to Login */}
      <div className="text-center">
        <Button
          variant="link"
          onClick={onBackToLogin}
          className="text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Button>
      </div>
    </div>
  );
}