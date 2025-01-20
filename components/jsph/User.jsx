import css from './user.module.css';
export function User({ user }) {
  const {
    id, name, username, email,
    address: { street, suite, city, zipcode, geo: { lat, lng } },
    phone, website,
    company: {
      name: cname,
      catchPhrase,
      bs
    } } = user;
  return <fieldset className={css.usercard}>
    <legend>#{id} {username}</legend>
    <h3>{name}</h3>
    <div> 📧<a href={`mailto:${email}`}>{email}</a>📞<a href={`tel:${phone}`}>{phone}</a></div>
    <div>🌐<a href={`http://${website}`}>{website}</a></div>
    <div title={zipcode}><a href={`https://maps.google.com/maps?ll=${lat},${lng}`}>{street},{suite},{city}</a></div>
    <div><b>{cname}</b><br />{catchPhrase}<br />{bs}</div>
  </fieldset>;
}
