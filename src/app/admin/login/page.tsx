export default function Page() {
  return (
    <main>
      <h1>Admin Login</h1>
      <form method="post" action="/api/admin/login">
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
