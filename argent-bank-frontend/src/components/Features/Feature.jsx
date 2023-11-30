export default function Feature({feature}) {
    if (!feature || !feature.img) {
        return <div></div>;
      }
    return(        
        <div className="feature-item">
          <img src={feature.img} 
          alt="Chat Icon" 
          className="feature-icon" 
          />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>
            {feature.text}
          </p>
        </div>
    )
} 
