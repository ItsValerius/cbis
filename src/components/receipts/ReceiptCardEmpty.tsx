import { Card, CardContent } from "~/components/ui/card";
import ReceiptUploadDrawerDialog from "./ReceiptUploadDrawerDialog";

const ReceiptCardEmpty = ({ groupdId }: { groupdId: number }) => {
  return (
    <Card className="flex h-60 min-h-full w-full max-w-full  flex-col transition-shadow duration-500 hover:shadow-xl md:h-80">
      <CardContent className="  m-2 flex  h-full items-center justify-center rounded border-2 border-dashed p-0   md:m-4">
        <ReceiptUploadDrawerDialog groupdId={groupdId} />
      </CardContent>
    </Card>
  );
};

export default ReceiptCardEmpty;
