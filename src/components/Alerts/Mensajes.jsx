const Mensaje = ({ children, tipo }) => {
    return (
        <div className={`p-4 border-l-4 ${tipo ? 'border-green-500' : 'border-red-500'} rounded-lg 
                    ${tipo ? 'bg-green-50' : 'bg-red-50'} flex items-center mt-4 shadow-md`}>
            <div className="flex-shrink-0">
                <svg className={`w-6 h-6 ${tipo ? 'text-green-500' : 'text-red-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
            </div>
            <div className="ml-3">
                <div className={`text-sm font-medium ${tipo ? 'text-green-700' : 'text-red-700'}`}>
                    <p>{children}</p>
                </div>
            </div>
        </div>
    )
}

export default Mensaje