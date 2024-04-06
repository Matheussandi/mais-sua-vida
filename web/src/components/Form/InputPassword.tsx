import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function InputPassword({ name, ...props }: InputPasswordProps) {
  const { register } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className="relative">
      <input
        id={name}
        type={showPassword ? 'text' : 'password'}
        className="rounded-lg border border-gray-300 px-4 py-2 w-full"
        {...register(name)}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
        {showPassword ? (
          <FiEyeOff onClick={toggleShowPassword} />
        ) : (
          <FiEye onClick={toggleShowPassword} />
        )}
      </div>
    </div>
  );
}