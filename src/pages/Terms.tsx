
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms & Conditions</h1>
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>Welcome to TechLocator. By accessing or using our service, you agree to be bound by these Terms and Conditions.</p>
          
          <h2>2. Definitions</h2>
          <p>"Service" refers to the website, mobile application, and features provided by TechLocator.</p>
          <p>"User" refers to any individual who uses the Service.</p>
          
          <h2>3. Account Registration</h2>
          <p>Users may be required to create an account to access certain features of the Service. Users are responsible for maintaining the confidentiality of their account information.</p>
          
          <h2>4. User Conduct</h2>
          <p>Users agree not to use the Service for any illegal or unauthorized purpose. Users agree not to violate any laws in their jurisdiction.</p>
          
          <h2>5. Content</h2>
          <p>Users may post content on the Service. Users retain ownership of their content but grant TechLocator a license to use, modify, and display the content.</p>
          
          <h2>6. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are owned by TechLocator and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          
          <h2>7. Termination</h2>
          <p>TechLocator may terminate or suspend a user's access to the Service without prior notice or liability for any reason.</p>
          
          <h2>8. Changes to Terms</h2>
          <p>TechLocator reserves the right to modify these Terms at any time. Users will be notified of any changes.</p>
          
          <h2>9. Limitation of Liability</h2>
          <p>In no event shall TechLocator be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
          
          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by the laws of the jurisdiction in which TechLocator operates.</p>
        </div>
      </Card>
    </div>
  );
};

export default Terms;
