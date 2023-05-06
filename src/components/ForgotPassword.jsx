import { useForm } from 'react-hook-form';
import React from 'react';


const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors },watch } = useForm();
    const onSubmit = data => console.log(data);

    const password = React.useRef({});
    password.current = watch("password", "");
  return (
    <div>
        <section className="bg-gray-50">
            
      
        <div className="w-96 p-6 bg-white rounded-lg shadow">
            <h2 className="mb-1 text-xl font-bold  text-gray-900 py-3">
                Change Password
            </h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your Phone</label>
                    <input type="number" name="phone" id="phone" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-primaryRed focus:border-primaryRed focus:border"

                        {...register("phone", {required: true, pattern: /^01[3-9]\d{8}$/
                        })}
                        
                    />

                    
                    {errors.phone?.type === 'required' && <p className='text-sm text-red-600' >*phone is required</p>}
                    {errors.phone?.type === 'pattern' && <p className='text-sm text-red-600' >*use correct format</p>}
                    
                    
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-primaryRed focus:border-primaryRed focus:border" 
                    {...register("password", {
                        required: "Password is required",
                    })}
                    />
                    {errors.password?.type === 'required' && <p className='text-sm text-red-600' >*password is required</p>}
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                    <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-primaryRed focus:border-primaryRed focus:border" {...register("confirmPassword", {
                      validate: (value) =>
                    value === password.current || "The passwords do not match",
                     })}/>
                     {errors.confirmPassword && <p className='text-sm text-red-600' >{errors.confirmPassword.message}</p>}
                </div>
               
                <button type="submit" className="w-full text-white bg-primaryRed hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset passwod</button>
            </form>
                </div>
   
  </section>
  </div>
  )
}
export default ForgotPassword