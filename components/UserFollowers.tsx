export default function UserFollowers() {
  const stats = [
    { value: "4.6k", label: "Followers" },
    { value: "4.6k", label: "Following" },
    { value: "4.6k", label: "Event" },
  ];

  return (
    <div className="hidden sm:grid grid-cols-3 gap-4 bg-primary-theme p-4 rounded-md text-white text-center">
      {stats.map((stat, index) => (
        <div key={index}>
          <div className="text-lg font-medium">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
