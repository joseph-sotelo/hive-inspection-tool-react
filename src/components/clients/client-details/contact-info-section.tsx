// Displays client's contact info
// TODO: replace mock data with actual data

import ContactChip from '@/components/clients/contact-chip';

interface ContactInfoSectionProps {
    phone?: string;
    email?: string;
}

export default function ContactInfoSection({ 
    phone = "123-456-7890", 
    email = "custom@client.com" 
}: ContactInfoSectionProps) {
    return (
        <div id="contact-info" className="flex flex-col gap-6">
            <h4>Contact Information</h4>
            <div className='flex flex-col gap-2'>
                <ContactChip contactType="phone" value={phone} />
                <ContactChip contactType="email" value={email} />
            </div>            
        </div>
    );
} 