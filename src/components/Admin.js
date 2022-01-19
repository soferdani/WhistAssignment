export default function Admin() {
    
	return (
        <div className='admin'>
            <div className="button-container">
                <button>Add</button>
            </div>
			<div className='table'>
				<table>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Option</th>
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
					</tr>
					<tr>
						<td>Centro comercial Moctezuma</td>
						<td>Francisco Chang</td>
						<td>Mexico</td>
					</tr>
				</table>
			</div>
		</div>
	);
}
