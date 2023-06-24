interface ButtonProps {
    title: string;
}

export function Button(props: ButtonProps) {
    return (
        <button className="bg-primary p-2 rounded">
            {props.title}
        </button>
    )
}