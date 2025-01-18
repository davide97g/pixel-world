import sql from "../../config/postgres";

export async function getUsers() {
  const users = await sql`
          select
            *
          from users
        `;
  return users;
}
