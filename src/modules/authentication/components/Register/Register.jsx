import AuthButton from '@/components/ui/AuthButton'
import CustomProgressBar from '@/components/ui/CustomProgressBar'
import Input from '@/components/ui/Input'
import { Progress } from '@/components/ui/progress'
import { MessageSquare } from 'lucide-react'
import React, { useEffect } from 'react'
import actor1 from './../../../../assets/images/6dbde96d619fa2275584886db44d81a4.png'
export default function Register() {
  const [page, setPage] = React.useState(1)
  useEffect(() => {

    console.log(page)
  }, [page])
  const handleNext = () => {
    setPage(prev => {
      const nextPage = prev + 1;
      console.log('Setting page to:', nextPage);
      return nextPage;
    });
  };
  return (
    <div className='w-full flex justify-center gap-3'>
      <div className='flex flex-col gap-3 w-[60%] '>


        {page === 1 && <RegisterFirstPage setPage={setPage} page={page} />}
        {page === 2 && <RegisterSecondPage setPage={setPage} page={page} />}
        {page === 3 && <RegisterThirdPage setPage={setPage} page={page} />}
        {page === 4 && <RegisterFourthPage setPage={setPage} page={page} />}

      </div>
    </div>
  )

}
export function RegisterFirstPage({ setPage, page }) {
  return (
    <>
      <div className='flex justify-center'>
        <CustomProgressBar progress={25} />
      </div>
      <div className='grid grid-cols-2 gap-2 justify-center '>
        <Input  className='w-full' />
        <Input className='w-full' />
        <div className='col-span-2'>
          <Input className='w-full' />
        </div>
        <div className='col-span-2'>
          <Input className='w-full' />
        </div>
        <div className='col-span-2'>
          <Input className='w-full' />
        </div>
        <Input className='w-full' />
        <Input className='w-full' />

      </div>
      <div className='flex justify-center'>
        <AuthButton title={'Next'} onclick={() => setPage(prev => prev + 1)} />
      </div>
    </>
  )
}
export function RegisterSecondPage({ setPage, page }) {
  return (
    <>
      <div className='flex justify-center'>
        <CustomProgressBar progress={50} />
      </div>
      <div className='grid grid-cols-2  justify-center  gap-3'>
        <div className='relative bg-gradient-to-t from-[#F4F4F4] to-[white] border border-black py-5 h-[175px] rounded-[20px] flex justify-between px-2  w-full  overflow-hidden'>
          <div className='flex items-start justify-start   '>
            <input type="checkbox" />
          </div>
          <div className='  absolute bottom-0 -start-8 -translate-x-[6%] ' style={{ zIndex: 999 }}>
            <img src={actor1} alt="" className='object-contain w-full hover:scale-110 transition-all duration-300 ' />

          </div>

          <div className='flex'>
            <h2 className='font-family-pri text-[43px] leading-10 '>LOSS<br />WEIGHT</h2>
          </div>
        </div>
        <div className='relative bg-gradient-to-t from-[#F4F4F4] to-[white] border border-black py-5 h-[175px] rounded-[20px] flex justify-between px-2  w-full  overflow-hidden'>
          <div className='flex items-start justify-start   '>
            <input type="checkbox" />
          </div>
          <div className='  absolute bottom-0 -start-8 -translate-x-[6%] ' style={{ zIndex: 999 }}>
            <img src={actor1} alt="" className='object-contain w-full  ' />

          </div>

          <div className='flex'>
            <h2 className='font-family-pri text-[43px] leading-10 '>General<br />fitness</h2>
          </div>
        </div>
        <div className='relative bg-gradient-to-t from-[#F4F4F4] to-[white] border border-black py-5 h-[175px] rounded-[20px] flex justify-between px-2  w-full  overflow-hidden'>
          <div className='flex items-start justify-start   '>
            <input type="checkbox" />
          </div>
          <div className='  absolute bottom-0 -start-8 -translate-x-[6%] ' style={{ zIndex: 999 }}>
            <img src={actor1} alt="" className='object-contain w-full  ' />

          </div>

          <div className='flex'>
            <h2 className='font-family-pri text-[43px] leading-10 '>Muscle<br />Gain</h2>
          </div>
        </div>
        <div className='relative bg-gradient-to-t from-[#F4F4F4] to-[white] border border-black py-5 h-[175px] rounded-[20px] flex justify-between px-2  w-full  overflow-hidden'>
          <div className='flex items-start justify-start   '>
            <input type="checkbox" />
          </div>
          <div className='  absolute bottom-0 -start-8 -translate-x-[6%] ' style={{ zIndex: 999 }}>
            <img src={actor1} alt="" className='object-contain w-full  ' />

          </div>

          <div className='flex'>
            <h2 className='font-family-pri text-[43px] leading-10 '>other</h2>
          </div>
        </div>

      </div>

      <div className='flex justify-between w-full'>
        <AuthButton title={'prev'} onclick={() => setPage(prev => prev - 1)} />
        <AuthButton title={'Next'} onclick={() => setPage(prev => prev + 1)} />
      </div>

    </>
  )
}
export function RegisterThirdPage({ setPage, page }) {
  return (
    <>
      <div className='flex justify-center'>
        <CustomProgressBar progress={75} />
      </div>
      <div className='grid grid-cols-2 gap-2 justify-center '>
        <Input className='w-full' />
        <Input className='w-full' />
        <div className='col-span-2'></div>
        <Input className='w-full' />
      </div>
      <div className='col-span-2'>
        <Input className='w-full' />
      </div>
      <div className='col-span-2'>
        <Input className='w-full' />
      </div>
      <Input className='w-full' />
      <Input className='w-full' />
      <div className='flex justify-between w-full'>
        <AuthButton title={'prev'} onclick={() => setPage(prev => prev - 1)} />
        <AuthButton title={'Next'} onclick={() => setPage(prev => prev + 1)} />
      </div>

    </>
  )
}
export function RegisterFourthPage({ setPage, page }) {
  return (
    <>
      <div className='flex justify-center'>
        <CustomProgressBar progress={100} />
      </div>
      <div className='grid grid-cols-2 gap-2 justify-center '>
        <Input className='w-full' />
        <Input className='w-full' />
        <div className='col-span-2'></div>
        <Input className='w-full' />
      </div>
      <div className='col-span-2'>
        <Input className='w-full' />
      </div>
      <div className='col-span-2'>
        <Input className='w-full' />
      </div>
      <Input className='w-full' />
      <Input className='w-full' />
      <div className='flex justify-between w-full'>
        <AuthButton title={'prev'} onclick={() => setPage(prev => prev - 1)} />
        <AuthButton title={'Submit'} />
      </div>


    </>
  )
}