import ByFileUrl from './ByFileUrl';
export default function page() {
  return (
    <div className="h-screen flex-col gap-5 flex p-3 justify-center items-center">
      <div className='max-w-xl gap-3 mx-auto'>
        <ByFileUrl />
      </div>
    </div>
  )
}
