import { useRef, useState } from "react";
import TitleHeader from "./TitleHeader.jsx";
import ContactCanvas from "./ContactCanvas.jsx";
import { toast } from "react-toastify";

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Email sending function using EmailJS alternative
    const sendEmail = async (formData) => {
        const { name, email, message } = formData;

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL;

        if (!accessKey || !recipientEmail) {
            console.error('Missing environment variables. Please check your .env file.');
            throw new Error('Configuration error: Missing environment variables');
        }

        // Create email content
        const emailContent = {
            to: recipientEmail, // Replace with your email
            subject: `New Contact Form Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #555; margin-bottom: 10px;">Contact Details:</h3>
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                        <p>This email was sent from your website contact form on ${new Date().toLocaleString()}</p>
                        <p>Reply directly to this email to respond to ${name}</p>
                    </div>
                </div>
            `,
            replyTo: email
        };

        // Method 1: Using Web3Forms (Recommended - Free tier available)
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: accessKey, // Get from https://web3forms.com
                    name: name,
                    email: email,
                    message: message,
                    subject: `New Contact Form Message from ${name}`,
                    from_name: 'Your Website Contact Form',
                    to: recipientEmail // Replace with your email
                })
            });

            if (response.ok) {
                return { success: true };
            } else {
                throw new Error('Web3Forms failed');
            }
        } catch (error) {
            console.log('Web3Forms failed',error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic client-side validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            toast.error('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const result = await sendEmail(form);

            if (result.success) {
                toast.success('Message sent successfully! I\'ll get back to you soon.');
                setForm({ name: "", email: "", message: "" });
            } else {
                toast.error('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send message. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex items-center justify-center px-5 md:px-10 md:mt-40 mt-20 min-h-screen">
            <div className="w-full h-full md:px-10 px-5 max-w-7xl">
                <TitleHeader
                    title="Get in Touch – Let's Connect"
                    sub="💬 Have questions or ideas? Let's talk! 🚀"
                />
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 mt-16">
                    {/* Contact Form - Full width on mobile, 5 columns on desktop */}
                    <div className="xl:col-span-5 w-full">
                        <div className="flex items-center justify-center border border-gray-700 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-6"
                            >
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="What's your good name?"
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="What's your email address?"
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can I help you?"
                                        rows="5"
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-500 resize-none"
                                    />
                                </div>

                                <button type="submit" disabled={loading} className="w-full mt-4">
                                    <div className={`px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex justify-center items-center relative cursor-pointer overflow-hidden group hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}>
                                        <div className="absolute -right-10 origin-center top-1/2 -translate-y-1/2 w-[120%] h-[120%] group-hover:w-10 group-hover:h-10 group-hover:right-4 rounded-full bg-white/20 transition-all duration-500" />
                                        <p className="uppercase md:text-lg font-semibold text-white transition-all duration-500 group-hover:text-gray-100 group-hover:-translate-x-3 xl:translate-x-0 -translate-x-3">
                                            {loading ? "Sending..." : "Send Message"}
                                        </p>
                                        <div className="group-hover:bg-white/30 w-12 h-12 rounded-full absolute right-4 top-1/2 -translate-y-1/2 flex justify-center items-center overflow-hidden">
                                            <img className="w-8 h-8 xl:-translate-y-32 translate-y-0 animate-bounce group-hover:translate-y-0 transition-all duration-500 filter" src="/arrow-down.svg" alt="arrow" />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* 3D Canvas - Hidden on mobile, visible on desktop */}
                    <div className="hidden xl:block xl:col-span-7 h-[75vh]">
                        <div className="bg-zinc-900 w-full h-full hover:cursor-grab overflow-hidden">
                            <ContactCanvas />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;






// const getBrowserSpecificPosition = (browser) => {
//     if (mobile) {
//         // Mobile positions - different for each browser
//         switch (browser) {
//             case 'chrome':
//                 return [0, 1.75, -1.4];
//             case 'firefox':
//                 return [0, 1.65, -1.4];
//             case 'edge':
//                 return [0, 1.58, -1.4];
//             case 'safari':
//                 return [0, 1.60, -1.4];
//             default:
//                 return [0, 1.58, -1.4];
//         }
//     } else {
//         switch (browser) {
//             case 'chrome':
//                 return [0,1.85,-1.4]; // Original position for Chrome
//             case 'firefox':
//                 return [0, 1.75, -1.4]; // Slightly higher for Firefox
//             case 'edge':
//                 return [0, 1.68, -1.4]; // Slightly lower for Edge
//             case 'safari':
//                 return [0, 1.70, -1.4]; // Custom position for Safari
//             default:
//                 return [0, 1.68, -1.4]; // Default position
//         }
//     }
// }