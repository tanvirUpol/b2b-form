import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <header>
        <div className="flex justify-around items-center p-6">
            <Link to="/" >
                <h1>Components101</h1>
            </Link>
            <nav>
                  
                    <Link to="/">Form</Link>
                    <Link className='ml-5' to="/table">Table</Link>
                    {/* <Link className='ml-5' to="/json">JSON</Link> */}
                    <Link className='ml-5' to="/forgotPassword">Frogot</Link>
                    <Link className='ml-5' to="/jsonMaker">NewJson</Link>
                    <Link className='ml-5' to="/imageUpload">ImageUpload</Link>
                  
            </nav>
        </div>
    </header>
  )
}
export default Navbar