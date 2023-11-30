import featuresData from '../../DATA/features.json';
import Feature from './Feature'

export default function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map(feature =>
                <Feature feature={feature} key={feature.id}/>
            )}
        </section>
    )
}  