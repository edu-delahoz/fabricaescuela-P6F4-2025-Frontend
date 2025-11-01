export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="border-4 border-blue-500 rounded-lg overflow-hidden bg-white">
          {/* Title skeleton */}
          <div className="bg-white py-8">
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>

          {/* Three column grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="bg-blue-600 py-3 px-4">
                  <div className="h-6 w-32 bg-blue-500 rounded mx-auto animate-pulse" />
                </div>
                <div className="p-6 space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                    <div key={j} className="flex justify-between">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Updates section skeleton */}
          <div className="p-6 pt-0">
            <div className="border rounded-lg p-6">
              <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Button skeleton */}
          <div className="p-6 pt-0 flex justify-end">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
