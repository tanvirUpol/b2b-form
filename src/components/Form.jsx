import { useForm } from 'react-hook-form';

const Form = () => {
  

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    // console.log(errors);
  

  return (
  <div className='w-10/12 h-5/6 m-auto bg-white flex flex-col gap-8 items-center justify-center rounded-md'>
     
      <h1 className='text-4xl'>Register User</h1>
      <form className='flex flex-col w-[500px] p-10  m-auto my-0' onSubmit={handleSubmit(onSubmit)}>

        <label className='mt-3' >
          Name:
        </label>
        <input className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primaryRed focus:border-2' 
        name='name' type="text" {...register("name", {required: true})} />
        {errors.name?.type === 'required' && <p>*name is required</p>}
        
        <label className='mt-3' >
          Phone:
        </label>
        <input className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primaryRed focus:border-2'      name="phone" {...register("phone", {required: true })}  type="number"/>
        {errors.phone?.type === 'required' && <p>*phone is required</p>}
        {errors.phone?.type === 'pattern' && <p>*use correct format</p>}
        
        <label className='mt-3' >
          Zone:
        </label>
        <input className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-primaryRed focus:border-primaryRed focus:border-2' type="text" {...register("zone", {required: true})} />
        {errors.zone?.type === 'required' && <p>*zone is required</p>}
        
        <label className='mt-3' >
          Role:
        </label>
        <div className='relative'>
          <select className='block appearance-none w-full  border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-primaryRed focus:border-2' {...register("role", {required: true})} >
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <div className="h-full pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-5 w-5 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        {errors.role?.type === 'required' && <p>*role is required</p>}
      
        
        <label className='mb-4' >
          
          <span className='block mb-2 mt-3' >Status:</span>
          <label className='mr-6' >
            <input name='status' className='mr-2 accent-primaryRed scale-150'  type="radio" value="active" {...register("status", {required: true})} />
            Active
          </label>
          <label>
            <input name='status' className='mr-2 accent-primaryRed scale-150' type="radio"  value="offline" {...register("status", {required: true})}  />
            Offline
          </label>
          {errors.status?.type === 'required' && <p className='*inline-block ml-3' >status is required</p>}
        </label>
        <button className='bg-primaryRed rounded-md text-white p-2 text-base' type="submit">Submit</button>
      </form>
  </div>
  )
}


export default Form