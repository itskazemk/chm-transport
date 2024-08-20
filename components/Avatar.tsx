"use client";

import { deleteSession } from "@/utils/session";
import { UserRoleTypeEnum } from "@/utils/zodSchemas";
import { Group, Menu, Avatar as MantineAvatar } from "@mantine/core";
function Avatar({ user }: any) {
  const { username, role } = user;

  const roleName = UserRoleTypeEnum[role];

  return (
    // <div className="flex border border-black p-2">
    //   <div>
    //     <div className="text-xl font-semibold">{username}</div>
    //     <div className="font-light">{roleName}</div>
    //   </div>
    //   <form action={deleteSession} className="mr-4 flex cursor-pointer items-center justify-center">
    //     <button type="submit">خروج</button>
    //   </form>
    // </div>

    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Group className="cursor-pointer rounded bg-base-200 px-2 py-1 hover:bg-base-100">
          <MantineAvatar src={"@/app/user.png"} radius="xl" />
          <div style={{ flex: 1 }}>
            <div>{username}</div>
            <div className="text-sm font-light">{roleName}</div>
          </div>
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        {/* <Menu.Label>نقش: {roleName}</Menu.Label> */}
        <Menu.Label>
          <form action={deleteSession}>
            <button type="submit" className="text-md w-full hover:text-red-400">
              خروج
            </button>
          </form>
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Avatar;
