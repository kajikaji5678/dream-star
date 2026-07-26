type Props = {
  title: string
};

export default function AdminTitle({ title }: Props) {
  return (
    <div className="px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-500 w-full rounded">
      <h1 className="font-bold">{title}</h1>
    </div>
  )
}