export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground font-mono space-y-6">
        <p className="text-foreground font-bold mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <p>By accessing or using DevVault, you agree to be bound by these Terms of Service. If you disagree with any part of the terms then you may not access the service.</p>
        
        <h2 className="text-2xl text-foreground font-bold mt-12 mb-4">1. Account Responsibilities</h2>
        <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password, whether your password is with our service or a third-party service.</p>
        
        <h2 className="text-2xl text-foreground font-bold mt-12 mb-4">2. Acceptable Use</h2>
        <p>You agree not to use the service to store illegal material or to violate any laws in your jurisdiction (including but not limited to copyright or trademark laws).</p>
        
        <h2 className="text-2xl text-foreground font-bold mt-12 mb-4">3. Termination</h2>
        <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        
        <h2 className="text-2xl text-foreground font-bold mt-12 mb-4">4. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.</p>
      </div>
    </div>
  );
}
