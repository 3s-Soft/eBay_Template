import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-12">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          eBay Automation <span className="text-indigo-600">Engine</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
          The ultimate SaaS tool for eBay sellers. Automate your listing design process with dynamic, strict active-content compliant HTML templates.
        </p>
        
        <Link 
          href="/editor" 
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          Launch Template Automator
        </Link>
      </div>
      
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Built for Speed, SEO, and eBay Compliance</p>
      </div>
    </div>
  );
}
