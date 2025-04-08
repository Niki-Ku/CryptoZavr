interface IMnemonicRow {
	onRowClick: (e:React.MouseEvent<HTMLDivElement>) => void;
	name: string;
	isSettingsClicked: boolean;
	onDeleteClick: (e:React.MouseEvent<HTMLButtonElement>, name:string) => void;
	onRenameClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
  onSettingsClick: (e: React.MouseEvent<HTMLButtonElement>, name: string) => void;
  mnemonicId: string;
}

const MnemonicRow: React.FC<IMnemonicRow> = ({
	onRowClick,
	name,
	isSettingsClicked,
	onDeleteClick,
	onRenameClick,
  onSettingsClick,
  mnemonicId
}) => {
	return (
		<div
			onClick={onRowClick}
			className="p-2 w-full relative hover:bg-accent-hover cursor-pointer flex justify-between"
		>
			<span>{name}</span>
			<button
				aria-label="options"
				className="z-10 hover:bg-transp-three rounded-full"
				onClick={(e) => onSettingsClick(e, mnemonicId)}
			>
				Icon
			</button>
			{isSettingsClicked && (
				<div className="absolute right-2 top-8 bg-background-main flex flex-col z-20 rounded p-1">
					<button onClick={(e) => onDeleteClick(e, mnemonicId)}>Delete wallet</button>
					<button onClick={onRenameClick}>Rename wallet</button>
				</div>
			)}
		</div>
	);
};

export default MnemonicRow;
