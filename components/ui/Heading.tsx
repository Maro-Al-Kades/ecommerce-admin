interface HeadingProps {
  title: string;
  description: string;
}

const Heading:React.FC<HeadingProps> = ({title, description}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl font-extrabold text-primary">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Heading