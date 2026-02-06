export default function AnfrageForm() {
  return (
    <form>
      <h2>Suche Firmen</h2>
      <label>
        Firmenname
        <input name="firmName" />
      </label>
      <label>
        Kontaktperson
        <input name="contactName" />
      </label>
      <label>
        Telefon
        <input name="phone" />
      </label>
      <label>
        E-Mail
        <input name="email" type="email" />
      </label>
      <label>
        Nachricht
        <textarea name="message" />
      </label>
      <button type="submit">Anfrage senden</button>
    </form>
  );
}
