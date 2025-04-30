export default function TeamMember({ name, description, image }) {
    return (
      <div className="team-member">
        <img src={image} alt={name} className="team-image" />
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    );
  }