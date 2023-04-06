import ContentLoader from "react-content-loader"

const VideosSkeleton = (props) => (
	<ContentLoader
		speed={2}
		width={1015}
		height={600}
		viewBox="0 0 1015 600"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="60" y="338" rx="0" ry="0" width="1" height="0" />
		<rect x="95" y="28" rx="0" ry="0" width="80" height="1" />
		<rect x="91" y="31" rx="0" ry="0" width="40" height="0" />
		<rect x="-11" y="96" rx="0" ry="0" width="195" height="172" />
		<rect x="199" y="95" rx="0" ry="0" width="185" height="174" />
		<rect x="404" y="96" rx="0" ry="0" width="179" height="174" />
		<rect x="20" y="282" rx="0" ry="0" width="161" height="20" />
		<rect x="102" y="298" rx="0" ry="0" width="20" height="1" />
		<rect x="211" y="283" rx="0" ry="0" width="161" height="20" />
		<rect x="417" y="283" rx="0" ry="0" width="161" height="20" />
		<rect x="2" y="327" rx="0" ry="0" width="195" height="172" />
		<rect x="212" y="326" rx="0" ry="0" width="185" height="174" />
		<rect x="417" y="327" rx="0" ry="0" width="179" height="174" />
		<rect x="22" y="513" rx="0" ry="0" width="161" height="20" />
		<rect x="220" y="514" rx="0" ry="0" width="161" height="20" />
		<rect x="430" y="514" rx="0" ry="0" width="161" height="20" />
	</ContentLoader>
)

export default VideosSkeleton
