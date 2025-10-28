// app/forms/page.tsx
export default function FormsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8 space-y-12">
      {/* Form 1 - Font size 14px */}
      <form className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm" style={{ fontSize: '14px' }}>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Form with 14px Font</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
        >
          Submit
        </button>
      </form>

      {/* Form 2 - Font size 17px */}
      <form className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm" style={{ fontSize: '17px' }}>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Form with 17px Font</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Username</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
