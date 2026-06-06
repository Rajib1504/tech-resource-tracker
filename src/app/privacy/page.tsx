export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground font-mono space-y-6">
        <p className="text-foreground font-bold mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <p>At DevVault, we take your privacy seriously. This policy describes what information we collect and how it is used.</p>
        
        <h2 className="text-2xl text-foreground font-bold mt-12 mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, save resources, or add snippets. This includes your email address, profile information, and the content of your vault.</p>
        
        <h2 className="text-2xl text-foreground font-bold mt-12 mb-4">2. How We Use Information</h2>
        <p>We use the information to provide, maintain, and improve our services. Your snippets and links are entirely private unless explicitly shared. We do not sell your data to third parties.</p>
        
        <h2 className="text-2xl text-foreground font-bold mt-12 mb-4">3. Data Security</h2>
        <p>We implement industry-standard encryption to protect your data. However, no method of transmission over the Internet is 100% secure. We cannot guarantee its absolute security.</p>

        <h2 className="text-2xl text-foreground font-bold mt-12 mb-4">4. Cookies</h2>
        <p>We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
      </div>
    </div>
  );
}
