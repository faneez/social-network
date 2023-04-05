import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonGroup = () => {
	return (
		<ContentLoader
			speed={2}
			width={653}
			height={418}
			viewBox="0 0 653 418"
			backgroundColor="#4d4b4b"
			foregroundColor="#ecebeb"
			style={{ marginLeft: "130px", marginTop: "50px" }}
		>
			<rect x="60" y="338" rx="0" ry="0" width="1" height="0" />
			<rect x="4" y="4" rx="0" ry="0" width="355" height="52" />
			<rect x="95" y="28" rx="0" ry="0" width="80" height="1" />
			<rect x="91" y="31" rx="0" ry="0" width="40" height="0" />
			<circle cx="52" cy="131" r="47" />
			<rect x="107" y="92" rx="0" ry="0" width="213" height="18" />
			<rect x="108" y="141" rx="0" ry="0" width="195" height="20" />
			<rect x="398" y="104" rx="0" ry="0" width="156" height="46" />
			<circle cx="47" cy="242" r="47" />
			<rect x="112" y="206" rx="0" ry="0" width="213" height="18" />
			<rect x="112" y="253" rx="0" ry="0" width="195" height="20" />
			<rect x="399" y="216" rx="0" ry="0" width="156" height="46" />
			<circle cx="53" cy="370" r="47" />
			<rect x="114" y="336" rx="0" ry="0" width="213" height="18" />
			<rect x="113" y="376" rx="0" ry="0" width="195" height="20" />
			<rect x="398" y="358" rx="0" ry="0" width="156" height="46" />
		</ContentLoader>
	)
}

export default SkeletonGroup
