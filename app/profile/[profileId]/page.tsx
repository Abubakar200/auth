interface ProfileIdProps {
  params: {
    profileId: string;
  };
}

const ProfileId = ({ params }: ProfileIdProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full py-2">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-4xl font-bold tracking-tighter">Profile Page</h2>
        <h2 className="text-lg font-bold bg-cyan-500 rounded-lg p-4 shadow-lg text-white">{params.profileId}</h2>
      </div>
    </div>
  );
};

export default ProfileId;
