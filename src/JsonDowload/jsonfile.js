import React, { useState, useRef } from "react";
import db from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";

function JsonDowload() {
	const [download, setDownload] = useState([]);
	const downloadLink = useRef();

	const downloadMyCollection = async () => {
		const myCollection = collection(db, "todoList");
		const data = await getDocs(myCollection);
		setDownload(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	return (
		<div style={{ marginTop: "30px" }}>
			<button className="todo-button" onClick={downloadMyCollection}>
				Tải file JSON{" "}
				<a
					href={`data:text/json;charset=utf-8,${encodeURIComponent(
						JSON.stringify(download)
					)}`}
					download="export.json"
					className="hidden"
					ref={downloadLink}
					style={{ display: "none" }}
				></a>
			</button>
		</div>
	);
}

export default JsonDowload;
