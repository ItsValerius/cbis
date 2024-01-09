import { Card, CardContent } from "~/components/ui/card";
import ReceiptUploadDrawerDialog from "./ReceiptUploadDrawerDialog";

const ReceiptCardEmpty = ({ groupdId }: { groupdId: number }) => {
  return (
    <Card className="flex w-[480px] max-w-full flex-col  transition-shadow duration-500 hover:shadow-xl xl:w-full">
      <CardContent className="  m-2 flex h-40 items-center justify-center rounded border-2 border-dashed p-0  md:m-4 md:h-full">
        <ReceiptUploadDrawerDialog groupdId={groupdId} />
      </CardContent>
    </Card>
  );
};

export default ReceiptCardEmpty;
