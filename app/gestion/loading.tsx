export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="h-9 w-64 bg-blue-500 rounded mx-auto animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Search bar skeleton */}
          <div className="mb-6">
            <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="flex max-w-2xl mx-auto gap-2">
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Shipment list skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
