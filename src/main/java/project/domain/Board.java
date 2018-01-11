package project.domain;

public class Board {
	int no;
	int mno;
	int cno;
	int pageNo;
	int pageSize;
	String name;
	String bw_titl;
	String bw_con;
	String bw_wdt;
	String bw_edt;
	String bw_hits;
	String bw_div;
  @Override
  public String toString() {
    return "Board [no=" + no + ", mno=" + mno + ", cno=" + cno + ", pageNo=" + pageNo + ", pageSize=" + pageSize
        + ", name=" + name + ", bw_titl=" + bw_titl + ", bw_con=" + bw_con + ", bw_wdt=" + bw_wdt + ", bw_edt=" + bw_edt
        + ", bw_hits=" + bw_hits + ", bw_div=" + bw_div + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getMno() {
    return mno;
  }
  public void setMno(int mno) {
    this.mno = mno;
  }
  public int getCno() {
    return cno;
  }
  public void setCno(int cno) {
    this.cno = cno;
  }
  public int getPageNo() {
    return pageNo;
  }
  public void setPageNo(int pageNo) {
    this.pageNo = pageNo;
  }
  public int getPageSize() {
    return pageSize;
  }
  public void setPageSize(int pageSize) {
    this.pageSize = pageSize;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getBw_titl() {
    return bw_titl;
  }
  public void setBw_titl(String bw_titl) {
    this.bw_titl = bw_titl;
  }
  public String getBw_con() {
    return bw_con;
  }
  public void setBw_con(String bw_con) {
    this.bw_con = bw_con;
  }
  public String getBw_wdt() {
    return bw_wdt;
  }
  public void setBw_wdt(String bw_wdt) {
    this.bw_wdt = bw_wdt;
  }
  public String getBw_edt() {
    return bw_edt;
  }
  public void setBw_edt(String bw_edt) {
    this.bw_edt = bw_edt;
  }
  public String getBw_hits() {
    return bw_hits;
  }
  public void setBw_hits(String bw_hits) {
    this.bw_hits = bw_hits;
  }
  public String getBw_div() {
    return bw_div;
  }
  public void setBw_div(String bw_div) {
    this.bw_div = bw_div;
  }
 
	
	
}