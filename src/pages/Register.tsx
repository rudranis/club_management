
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
