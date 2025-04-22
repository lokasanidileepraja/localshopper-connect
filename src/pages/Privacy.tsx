
import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>TechLocator collects personal information that you provide to us, such as your name, email address, phone number, and location.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience.</p>
          
          <h2>3. Information Sharing</h2>
          <p>We may share your information with third-party service providers to help us deliver our services. We may also share information to comply with laws or to protect the rights, property, or safety of TechLocator, our users, or others.</p>
          
          <h2>4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
          
          <h2>5. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy.</p>
          
          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. You may also have the right to object to or restrict certain processing of your personal information.</p>
          
          <h2>7. Children's Privacy</h2>
          <p>Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.</p>
          
          <h2>8. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          
          <h2>9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@techlocator.com.</p>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;
