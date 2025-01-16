import { Button, Chip, Divider, Input, Tooltip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import User from '../components/User';

import { AUTH } from '../services/auth';

import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Loader } from '../components/Loader';
import { useUserUpdateUser } from '../hooks/database/user/useUserUpdateUser';
import { useAuth } from '../hooks/useAuth';
import { useLayout } from '../hooks/useLayout';

export default function PersonalArea() {
  const { isLogged, user, isAdmin } = useAuth();
  const { isPending } = useUserUpdateUser();
  const { isMobile } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/login');
  }, [isLogged, navigate]);

  const handleLogout = async () => {
    AUTH.logout().then(() => navigate('/'));
  };

  return (
    <div className="w-full sm:w-6/12 flex flex-col justify-center items-center gap-4 px-10">
      {isPending && <Loader />}
      <div className="pt-28 md:pt-20 flex flex-row items-center">
        <h1 className="text-2xl">Personal Area</h1>
      </div>
      <Button
        isIconOnly={isMobile}
        size={isMobile ? 'sm' : 'md'}
        className="text-xs sm:text-sm absolute top-2 left-2 sm:top-4 sm:left-4"
        onClick={() => navigate('/')}
        variant="ghost"
        startContent={<ArrowLeft />}
      >
        {isMobile ? '' : 'Home'}
      </Button>
      <User interactive={false} />
      <div className="flex flex-col gap-5 w-full">
        {isAdmin && (
          <Chip
            color="primary"
            variant="shadow"
            className="cursor-pointer text-xs sm:text-sm self-center"
            classNames={{
              base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/10 shadow-pink-500/30',
              content: 'drop-shadow shadow-black text-white',
            }}
          >
            Admin
          </Chip>
        )}
        <Input
          isReadOnly
          type="email"
          label="Public Name"
          color="secondary"
          variant="bordered"
          value={user?.displayName}
          className="max-w-xs"
        />
        <Input
          isReadOnly
          type="email"
          label="Email"
          color="secondary"
          variant="bordered"
          value={user?.email}
          className="max-w-xs"
        />
        <div className="flex flex-row gap-2 sm:gap-4">
          <Chip
            variant="flat"
            color="secondary"
            className="cursor-pointer text-xs sm:text-sm"
            style={{
              backgroundColor: user?.color.value,
              color: user?.color.isLight ? 'black' : 'white',
            }}
          >
            Your color: {user?.color.name}
          </Chip>
          <Tooltip color="foreground" content="This is the your custom color">
            <Button
              className="h-40 w-40 rounded-md "
              style={{ backgroundColor: user?.color.value }}
              onClick={() =>
                navigate(`/color/${user?.color.value.replace('#', '')}`)
              }
            />
          </Tooltip>
        </div>

        <Divider className="my-2" />

        <div className="flex flex-row gap-2 sm:gap-4">
          <Button
            color="danger"
            onClick={handleLogout}
            size={isMobile ? 'sm' : 'md'}
            className="text-xs sm:text-sm"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
