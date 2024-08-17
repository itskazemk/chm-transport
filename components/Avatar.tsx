// import { deleteSession } from "@/utils/session";
import { deleteSession } from "@/utils/session";
import { UserRoleTypeEnum } from "@/utils/zodSchemas";
function Avatar({ user }: any) {
  const { username, role } = user;

  const roleName = UserRoleTypeEnum[role];

  return (
    <div className="flex border border-black p-2">
      <div>
        <div className="text-xl font-semibold">{username}</div>
        <div className="font-light">{roleName}</div>
      </div>
      <form action={deleteSession} className="mr-4 flex cursor-pointer items-center justify-center">
        <button type="submit">خروج</button>
      </form>
    </div>
    // <Menu shadow="md" width={200}>
    //   <Menu.Target>
    //     <Group>
    //       <MantineAvatar src={icon} radius="xl" />
    //       <div style={{ flex: 1 }}>USERNAME</div>
    //     </Group>
    //   </Menu.Target>
    //   <Menu.Dropdown>
    //     <Menu.Label>خروج</Menu.Label>
    //   </Menu.Dropdown>
    // </Menu>
  );
}

export default Avatar;
