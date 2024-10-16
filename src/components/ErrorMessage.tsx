
export default function ErrorMessage({children} : {children: React.ReactNode}) {
    return (
      <div className=" text-red-600 text-sm">
          {children}
      </div>
    )
}
  